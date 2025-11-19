import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, Calendar, Activity } from 'lucide-react';

const ProfilePage = () => {
    const { user, logout } = useAuth();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatLastActivity = (date?: string) => {
        if (!date) return 'No disponible';

        const lastLog = new Date(date);
        const now = new Date();
        const diffMs = now.getTime() - lastLog.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Hace un momento';
        if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
        if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    };

    if (!user) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardContent className="py-12 text-center">
                        <p className="text-neutral-500">Cargando perfil...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Mi Perfil</h1>
                <p className="text-neutral-500 mt-2">
                    Información de tu cuenta en QBLOCK
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>
                            Datos de tu cuenta de usuario
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-neutral-500">Nombre Completo</p>
                                <p className="font-medium">{user.fullName}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Mail className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-neutral-500">Email</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>

                        {user.phone && (
                            <>
                                <Separator />
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Phone className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-neutral-500">Teléfono</p>
                                        <p className="font-medium">{user.phone}</p>
                                    </div>
                                </div>
                            </>
                        )}

                        <Separator />

                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-neutral-500">Rol</p>
                                <p className="font-medium capitalize">{user.role}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Actividad de la Cuenta</CardTitle>
                        <CardDescription>
                            Información sobre tu actividad reciente
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Activity className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-neutral-500">Última Actividad</p>
                                <p className="font-medium">{formatLastActivity(user.last_log)}</p>
                                {user.last_log && (
                                    <p className="text-xs text-neutral-400 mt-1">
                                        {formatDate(user.last_log)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Separator />

                        <div className="bg-neutral-50 p-4 rounded-lg">
                            <p className="text-sm text-neutral-600">
                                Tu cuenta está activa y todos los servicios están disponibles.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Acciones de Cuenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Cerrar Sesión</p>
                            <p className="text-sm text-neutral-500">
                                Finaliza tu sesión actual en QBLOCK
                            </p>
                        </div>
                        <Button variant="outline" onClick={() => logout()}>
                            Cerrar Sesión
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const Route = createFileRoute('/_authenticated/profile')({
    component: ProfilePage,
});
