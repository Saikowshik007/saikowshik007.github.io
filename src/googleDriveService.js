class GoogleDriveService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://www.googleapis.com/drive/v3';
    }

    async getResumeLink(folderId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch resume from Google Drive');
            }

            const data = await response.json();

            if (data.files && data.files.length > 0) {
                const resumeFile = data.files[0];
                return `https://drive.google.com/file/d/${resumeFile.id}/view`;
            }

            return null;
        } catch (error) {
            console.error('Error fetching resume from Google Drive:', error);
            return null;
        }
    }

    async getResumeDownloadLink(folderId) {
        try {
            const response = await fetch(
                `${this.baseUrl}/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'&key=${this.apiKey}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch resume from Google Drive');
            }

            const data = await response.json();

            if (data.files && data.files.length > 0) {
                const resumeFile = data.files[0];
                return `${this.baseUrl}/files/${resumeFile.id}?alt=media&key=${this.apiKey}`;
            }

            return null;
        } catch (error) {
            console.error('Error fetching resume download link from Google Drive:', error);
            return null;
        }
    }
}