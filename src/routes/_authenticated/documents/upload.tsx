import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useCallback } from 'react';
import { useDocuments } from '@/hooks/use-documents';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const { uploadAsync, isUploading } = useDocuments();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        await uploadAsync(selectedFile);
        setSelectedFile(null);
        setTimeout(() => navigate({ to: '/documents' }), 1500);
      } catch (error) {
        // Error is already handled by the mutation's onError
        console.error('Upload failed:', error);
      }
    }
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
      <div>
        <h1 className="text-3xl font-bold">Subir Documento</h1>
        <p className="text-neutral-500 mt-2">
          Sube un documento para certificarlo en blockchain
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Seleccionar Archivo</CardTitle>
              <CardDescription>
                Arrastra y suelta un archivo o haz clic para seleccionar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-neutral-300 hover:border-primary/50'
                } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="p-4 bg-neutral-100 rounded-full">
                    <Upload className="h-8 w-8 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      Arrastra tu archivo aquí
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <p className="text-xs text-neutral-400">
                    PDF, DOC, DOCX, JPG, PNG (máx. 10MB)
                  </p>
                </label>
              </div>

              {selectedFile && (
                <div className="flex items-center gap-3 p-4 bg-neutral-50 rounded-lg">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{selectedFile.name}</p>
                    <p className="text-sm text-neutral-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  {!isUploading && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFile(null)}
                    >
                      Remover
                    </Button>
                  )}
                </div>
              )}

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subiendo documento...</span>
                    <span className="text-neutral-500">Procesando</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                size="lg"
              >
                {isUploading ? 'Subiendo...' : 'Subir Documento'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Proceso</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-2">
                  <span className="font-medium text-neutral-900">1.</span>
                  <span className="text-neutral-600">Sube tu documento</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-neutral-900">2.</span>
                  <span className="text-neutral-600">
                    Se genera un hash SHA-256
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-neutral-900">3.</span>
                  <span className="text-neutral-600">
                    Certifica en blockchain
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-neutral-900">4.</span>
                  <span className="text-neutral-600">
                    Descarga o comparte
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Los documentos se almacenan de forma segura y el hash se registra
              en XRP Ledger Testnet de forma permanente.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/documents/upload')({
  component: UploadDocumentPage,
});
