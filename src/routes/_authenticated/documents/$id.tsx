import { createFileRoute, Link } from '@tanstack/react-router';
import { useDocument } from '@/hooks/use-documents';
import { documentService } from '@/services/document-service';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowLeft, Download, Shield, ExternalLink, FileText, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const DocumentDetailPage = () => {
    const { id } = Route.useParams();
    const { data: document, isLoading } = useDocument(id);
    const [copiedHash, setCopiedHash] = useState<string | null>(null);

    const { data: verificationsData } = useQuery({
        queryKey: ['verifications', id],
        queryFn: () => documentService.getVerifications(id),
        enabled: !!id && !!document,
    });

    const verifications = Array.isArray(verificationsData) ? verificationsData : [];

    const copyToClipboard = (text: string, type: 'hash' | 'tx') => {
        navigator.clipboard.writeText(text);
        setCopiedHash(type);
        toast.success(type === 'hash' ? 'Hash copiado' : 'Transacción copiada');
        setTimeout(() => setCopiedHash(null), 2000);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (!document) {
        return (
            <div className="space-y-6">
                <Link to="/documents">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a documentos
                    </Button>
                </Link>
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-neutral-500">Documento no encontrado</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link to="/documents">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a documentos
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold mt-4">Detalles del Documento</h1>
                </div>
                <div className="flex gap-2">
                    {document.blockchainStatus === 'pending' && (
                        <Button variant="outline">
                            <Shield className="mr-2 h-4 w-4" />
                            Certificar
                        </Button>
                    )}
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-neutral-500">Nombre del Archivo</p>
                            <div className="flex items-center gap-2 mt-1">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <p className="font-medium">{document.filename}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-neutral-500">Tamaño</p>
                                <p className="font-medium">{formatFileSize(document.fileSize)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">Tipo</p>
                                <p className="font-medium">{document.fileType}</p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <p className="text-sm text-neutral-500">Estado</p>
                            <div className="mt-1">
                                {document.blockchainStatus === 'certified' ? (
                                    <Badge className="bg-green-500">Certificado</Badge>
                                ) : document.blockchainStatus === 'pending' ? (
                                    <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                        Pendiente
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">Fallido</Badge>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-neutral-500">Fecha de Subida</p>
                                <p className="font-medium text-sm">{formatDate(document.createdAt)}</p>
                            </div>
                            {document.certifiedAt && (
                                <div>
                                    <p className="text-sm text-neutral-500">Fecha de Certificación</p>
                                    <p className="font-medium text-sm">{formatDate(document.certifiedAt)}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Hash del Documento</CardTitle>
                        <CardDescription>
                            Identificador único basado en el contenido
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative group">
                            <code className="block bg-neutral-100 p-3 rounded text-xs break-all pr-10">
                                {document.fileHash}
                            </code>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 text-neutral-500 hover:text-neutral-900"
                                onClick={() => copyToClipboard(document.fileHash, 'hash')}
                            >
                                {copiedHash === 'hash' ? (
                                    <Check className="h-3 w-3 text-green-500" />
                                ) : (
                                    <Copy className="h-3 w-3" />
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {document.xrpTxHash && (
                <Card>
                    <CardHeader>
                        <CardTitle>Información de Blockchain</CardTitle>
                        <CardDescription>
                            Registro en XRP Ledger Testnet
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-neutral-500">Hash de Transacción</p>
                            <div className="relative group mt-1">
                                <code className="block bg-neutral-100 p-2 rounded text-xs break-all pr-10">
                                    {document.xrpTxHash}
                                </code>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6 text-neutral-500 hover:text-neutral-900"
                                    onClick={() => copyToClipboard(document.xrpTxHash!, 'tx')}
                                >
                                    {copiedHash === 'tx' ? (
                                        <Check className="h-3 w-3 text-green-500" />
                                    ) : (
                                        <Copy className="h-3 w-3" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-neutral-500">Red</p>
                                <p className="font-medium">Testnet</p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500">Ledger Index</p>
                                <p className="font-medium text-sm">
                                    {document.xrpLedgerIndex}
                                </p>
                            </div>
                        </div>

                        <div>
                            <a
                                href={`https://testnet.xrpl.org/transactions/${document.xrpTxHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                            >
                                Ver transacción en Blockchain Explorer
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Verificaciones</CardTitle>
                    <CardDescription>
                        Registro de todas las verificaciones realizadas sobre este documento
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {verifications.length === 0 ? (
                        <p className="text-center text-neutral-500 py-8">
                            No hay verificaciones registradas para este documento
                        </p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Resultado</TableHead>
                                    <TableHead>IP</TableHead>
                                    <TableHead>User Agent</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {verifications.map((verification: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="text-sm">
                                            {formatDate(verification.verifiedAt)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    verification.result === 'valid'
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                }
                                            >
                                                {verification.result}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm font-mono">
                                            {verification.ipAddress}
                                        </TableCell>
                                        <TableCell className="text-sm text-neutral-500">
                                            {verification.userAgent?.substring(0, 50)}...
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/documents/$id')({
    component: DocumentDetailPage,
});
