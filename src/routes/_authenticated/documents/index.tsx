import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useDocuments } from '@/hooks/use-documents';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MoreVertical,
  Download,
  Shield,
  Trash2,
  ExternalLink,
  Upload,
  FileText
} from 'lucide-react';
import type { Document } from '@/services/document-service';

const DocumentsListPage = () => {
  const { documents, isLoading, certify, isCertifying, deleteDocument, download } = useDocuments();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  const handleDeleteClick = (doc: Document) => {
    setDocumentToDelete(doc);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (documentToDelete) {
      // @ts-ignore
      const docId = documentToDelete.id || documentToDelete._id;
      deleteDocument(docId);
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDocumentToDelete(null);
  };

  const getStatusBadge = (status: Document['blockchainStatus']) => {
    switch (status) {
      case 'certified':
        return <Badge className="bg-green-500">Certificado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pendiente</Badge>;
      case 'failed':
        return <Badge variant="destructive">Fallido</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mis Documentos</h1>
          <p className="text-neutral-500 mt-2">
            Gestiona y certifica tus documentos en blockchain
          </p>
        </div>
        <Link to="/documents/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Subir Documento
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Documentos</CardDescription>
            <CardTitle className="text-3xl">{documents.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Certificados</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {documents.filter((d) => d.blockchainStatus === 'certified').length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pendientes</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">
              {documents.filter((d) => d.blockchainStatus === 'pending').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
          <CardDescription>
            Lista de todos tus documentos subidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-neutral-400" />
              <h3 className="mt-4 text-lg font-medium">No hay documentos</h3>
              <p className="text-neutral-500 mt-2">
                Comienza subiendo tu primer documento
              </p>
              <Link to="/documents/upload">
                <Button className="mt-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Documento
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tamaño</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Subida</TableHead>
                  <TableHead>Hash</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc: any) => (
                  <TableRow key={doc.id || doc._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-blue-500" />
                        {doc.filename}
                      </div>
                    </TableCell>
                    <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                    <TableCell>{getStatusBadge(doc.blockchainStatus)}</TableCell>
                    <TableCell className="text-sm text-neutral-500">
                      {formatDate(doc.createdAt)}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-neutral-100 px-2 py-1 rounded">
                        {doc.fileHash.substring(0, 16)}...
                      </code>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {doc.blockchainStatus === 'pending' && (
                            <DropdownMenuItem
                              onClick={() => certify(doc.id || doc._id)}
                              disabled={isCertifying}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Certificar en Blockchain
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuItem
                            onClick={() => download(doc.id || doc._id, doc.filename)}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Descargar
                          </DropdownMenuItem>

                          {doc.xrpTxHash && (
                            <DropdownMenuItem asChild>
                              <a
                                href={`https://testnet.xrpl.org/transactions/${doc.xrpTxHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Ver en Blockchain
                              </a>
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(doc)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este documento? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          {documentToDelete && (
            <div className="py-4">
              <p className="text-sm text-neutral-600">
                Documento: <span className="font-medium">{documentToDelete.filename}</span>
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/documents/')({
  component: DocumentsListPage,
});
