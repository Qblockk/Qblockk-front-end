import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload, Shield, Search } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bienvenido, {user?.fullName || 'Usuario'}</h1>
        <p className="text-neutral-500 mt-2">
          Sistema de certificación de documentos con blockchain XRP Ledger
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-primary transition-colors cursor-pointer">
          <Link to="/documents/upload">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Subir Documento</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Carga un nuevo documento para certificarlo en blockchain
              </CardDescription>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary transition-colors cursor-pointer">
          <Link to="/documents">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Mis Documentos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ver y gestionar todos tus documentos certificados
              </CardDescription>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary transition-colors cursor-pointer">
          <Link to="/documents">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Certificar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Certifica documentos en XRP Ledger blockchain
              </CardDescription>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary transition-colors cursor-pointer">
          <Link to="/verify">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Search className="h-5 w-5 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Verificar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Verifica la autenticidad de un documento
              </CardDescription>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>¿Qué es QBLOCK?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600">
              Sistema de certificación de documentos académicos y profesionales
              utilizando tecnología blockchain XRP Ledger para garantizar la
              inmutabilidad y autenticidad.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seguridad Blockchain</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600">
              Cada documento es hasheado con SHA-256 y registrado en XRP Ledger
              Testnet, creando un registro permanente e inalterable de su existencia.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verificación Pública</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600">
              Cualquier persona puede verificar la autenticidad de un documento
              certificado sin necesidad de crear una cuenta.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_authenticated/')({
  component: Dashboard,
});
