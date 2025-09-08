import { createFileRoute } from '@tanstack/react-router'
import { RegisterForm } from '@/components/register-form'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            QBlockk
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your blockchain development platform
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}