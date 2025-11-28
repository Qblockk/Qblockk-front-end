import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/use-auth';
import { SignInPage, Testimonial } from '@/components/ui/sign-in';

const testimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "QBLOCK transformó cómo certifico documentos. Seguro, rápido y confiable en blockchain."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "La certificación blockchain nunca fue tan fácil. Interfaz limpia y resultados inmediatos."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "Confianza total en la autenticidad de documentos. QBLOCK es el futuro de la certificación."
  },
];

const LoginPage = () => {
  const { login, register: registerUser, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    login({ email, password });
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;

    registerUser({
      email,
      password,
      fullName,
      ...(phone && { phone })
    });
  };

  const handleResetPassword = () => {
    console.log("Reset Password clicked");
    // TODO: Implementar reset de contraseña
  };

  return (
    <SignInPage
      title={
        <>
          <span className="font-light text-foreground tracking-tighter">Bienvenido a </span>
          <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">QBLOCK</span>
        </>
      }
      description="Certificación de documentos en blockchain XRP Ledger"
      heroImageSrc="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=2160&q=80"
      testimonials={testimonials}
      onSignIn={handleSignIn}
      onRegister={handleRegister}
      onResetPassword={handleResetPassword}
    />
  );
};

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
