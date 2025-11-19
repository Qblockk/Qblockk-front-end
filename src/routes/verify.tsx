import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useVerifyDocument } from '@/hooks/use-documents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Upload, CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';

const VerifyDocumentPage = () => {
  const { verify, isVerifying, result, reset } = useVerifyDocument();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      reset();
    }
  };

  const handleVerify = () => {
    if (selectedFile) {
      verify(selectedFile);
    }
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

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Verificar Documento</h1>
          <p className="text-neutral-500 mt-2">
            Verifica la autenticidad de un documento certificado en blockchain
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selecciona el Documento a Verificar</CardTitle>
            <CardDescription>
              Sube el archivo que deseas verificar en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="verify-file"
                className="hidden"
                onChange={handleFileChange}
                disabled={isVerifying}
              />
              <label htmlFor="verify-file" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="p-4 bg-neutral-100 rounded-full">
                  <Upload className="h-8 w-8 text-neutral-600" />
                </div>
                <div>
                  <p className="text-lg font-medium">Selecciona un archivo</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Haz clic para elegir el documento
                  </p>
                </div>
              </label>
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-neutral-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedFile(null);
                    reset();
                  }}
                  disabled={isVerifying}
                >
                  Cambiar
                </Button>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={handleVerify}
              disabled={!selectedFile || isVerifying}
            >
              {isVerifying ? 'Verificando...' : 'Verificar Documento'}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>Resultado de la Verificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.exists ? (
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-green-900">Documento Verificado</AlertTitle>
                  <AlertDescription className="text-green-800">
                    Este documento está certificado en blockchain y es auténtico.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <XCircle className="h-5 w-5" />
                  <AlertTitle>Documento No Encontrado</AlertTitle>
                  <AlertDescription>
                    Este documento no está certificado en el sistema o ha sido modificado.
                  </AlertDescription>
                </Alert>
              )}

              {result.exists && result.document && (
                <div className="space-y-4">
                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-neutral-500">Nombre del Archivo</p>
                      <p className="font-medium">{result.document.fileName}</p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">Estado</p>
                      <div className="mt-1">
                        {result.document.status === 'certified' ? (
                          <Badge className="bg-green-500">Certificado</Badge>
                        ) : (
                          <Badge variant="outline">Pendiente</Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">Fecha de Certificación</p>
                      <p className="font-medium">
                        {result.document.certifiedAt
                          ? formatDate(result.document.certifiedAt)
                          : 'No certificado'}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">Hash SHA-256</p>
                      <code className="text-xs bg-neutral-100 px-2 py-1 rounded block mt-1 break-all">
                        {result.document.hash}
                      </code>
                    </div>
                  </div>

                  {result.document.blockchain && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                          Información de Blockchain
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-sm text-neutral-500">Hash de Transacción</p>
                            <code className="text-xs bg-neutral-100 px-2 py-1 rounded block mt-1 break-all">
                              {result.document.blockchain.transactionHash}
                            </code>
                          </div>

                          <div>
                            <p className="text-sm text-neutral-500">Red</p>
                            <p className="font-medium">{result.document.blockchain.network}</p>
                          </div>

                          <div>
                            <p className="text-sm text-neutral-500">Timestamp</p>
                            <p className="font-medium">
                              {formatDate(result.document.blockchain.timestamp)}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-neutral-500">Explorer</p>
                            <a
                              href={result.document.blockchain.explorerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                            >
                              Ver en Blockchain
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>¿Cómo funciona?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="font-semibold text-primary">1.</span>
                <span>
                  Se calcula el hash SHA-256 del documento que subes
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">2.</span>
                <span>
                  Se busca ese hash en nuestra base de datos de documentos certificados
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">3.</span>
                <span>
                  Si existe, se verifica contra el registro en XRP Ledger blockchain
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-primary">4.</span>
                <span>
                  Se muestra la información de certificación y el enlace al explorador de blockchain
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/verify')({
  component: VerifyDocumentPage,
});
