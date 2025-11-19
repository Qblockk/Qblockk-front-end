import { documentApi } from '@/lib/axios';
import { API_CONFIG } from '@/lib/api-config';

export interface Document {
  _id: string;
  filename: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  fileHash: string;
  blockchainStatus: 'pending' | 'certified' | 'failed';
  xrpTxHash?: string;
  xrpLedgerIndex?: number;
  certifiedAt?: string;
  verificationCount?: number;
  lastVerifiedAt?: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  tags?: string[];
}

export interface UploadDocumentResponse {
  document: Document;
  message: string;
}

export interface CertifyDocumentResponse {
  document: Document;
  transaction: {
    hash: string;
    explorerUrl: string;
  };
  message: string;
}

export interface VerifyDocumentRequest {
  file: File;
}

export interface VerifyDocumentResponse {
  exists: boolean;
  document?: Document;
  message: string;
}

export const documentService = {
  async upload(file: File): Promise<UploadDocumentResponse> {
    const formData = new FormData();
    formData.append('document', file);

    const response = await documentApi.post(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      document: response.data.data.document,
      message: response.data.message
    };
  },

  async list(): Promise<Document[]> {
    const response = await documentApi.get(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.LIST
    );
    return response.data.data.documents;
  },

  async getById(id: string): Promise<Document> {
    const response = await documentApi.get(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.GET_DOCUMENT(id)
    );
    return response.data.data.document;
  },

  async certify(id: string): Promise<CertifyDocumentResponse> {
    const response = await documentApi.post(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.CERTIFY(id)
    );
    return {
      document: response.data.data.document,
      transaction: {
        hash: response.data.data.document.xrpTxHash,
        explorerUrl: `https://testnet.xrpl.org/transactions/${response.data.data.document.xrpTxHash}`
      },
      message: response.data.message
    };
  },

  async download(id: string, fileName: string): Promise<void> {
    const response = await documentApi.get(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.DOWNLOAD(id),
      {
        responseType: 'blob',
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  async delete(id: string): Promise<void> {
    await documentApi.delete(API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.DELETE(id));
  },

  async getVerifications(id: string): Promise<any[]> {
    const response = await documentApi.get(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.VERIFICATIONS(id)
    );
    return response.data;
  },

  async verify(file: File): Promise<VerifyDocumentResponse> {
    const formData = new FormData();
    formData.append('document', file);

    const response = await documentApi.post<VerifyDocumentResponse>(
      API_CONFIG.DOCUMENT_SERVICE.ENDPOINTS.VERIFY,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};
