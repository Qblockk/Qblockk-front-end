import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { login, register: registerUser, isLoginLoading, isRegisterLoading, isAuthenticated } = useAuth();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const { phone, ...rest } = registerData;
    registerUser(phone ? registerData : rest);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">QBLOCK</CardTitle>
          <CardDescription>
            Sistema de certificación de documentos con blockchain
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    disabled={isLoginLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    disabled={isLoginLoading}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Iniciar Sesión
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Nombre Completo</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={registerData.fullName}
                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                    disabled={isRegisterLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    disabled={isRegisterLoading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-phone">
                    Teléfono <span className="text-neutral-500">(opcional)</span>
                  </Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+503 2395 1242"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    disabled={isRegisterLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Contraseña</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    disabled={isRegisterLoading}
                    required
                    minLength={6}
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Cuenta
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
