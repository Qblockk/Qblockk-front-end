import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { documentService } from '@/services/document-service';

export const useDocuments = () => {
  const queryClient = useQueryClient();

  const documentsQuery = useQuery({
    queryKey: ['documents'],
    queryFn: () => documentService.list(),
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => documentService.upload(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success(`Documento "${data.document.fileName}" subido exitosamente`);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al subir documento';
      toast.error(message);
    },
  });

  const certifyMutation = useMutation({
    mutationFn: (id: string) => documentService.certify(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success(`Documento certificado en blockchain`, {
        description: `Hash: ${data.transaction.hash.substring(0, 16)}...`,
      });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al certificar documento';
      toast.error(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => documentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast.success('Documento eliminado');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al eliminar documento';
      toast.error(message);
    },
  });

  const downloadDocument = async (id: string, fileName: string) => {
    try {
      await documentService.download(id, fileName);
      toast.success(`Descargando "${fileName}"`);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al descargar documento';
      toast.error(message);
    }
  };

  return {
    documents: documentsQuery.data || [],
    isLoading: documentsQuery.isLoading,
    isError: documentsQuery.isError,
    error: documentsQuery.error,
    upload: uploadMutation.mutate,
    isUploading: uploadMutation.isPending,
    certify: certifyMutation.mutate,
    isCertifying: certifyMutation.isPending,
    deleteDocument: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    download: downloadDocument,
    refetch: documentsQuery.refetch,
  };
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => documentService.getById(id),
    enabled: !!id,
  });
};

export const useVerifyDocument = () => {
  const verifyMutation = useMutation({
    mutationFn: (file: File) => documentService.verify(file),
    onSuccess: (data) => {
      if (data.exists) {
        toast.success('Documento verificado exitosamente', {
          description: 'Este documento está certificado en blockchain',
        });
      } else {
        toast.warning('Documento no encontrado', {
          description: 'Este documento no está certificado en el sistema',
        });
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al verificar documento';
      toast.error(message);
    },
  });

  return {
    verify: verifyMutation.mutate,
    isVerifying: verifyMutation.isPending,
    result: verifyMutation.data,
    reset: verifyMutation.reset,
  };
};
