/**
 * Vercel serverless function — issues client-upload tokens for Vercel Blob.
 * The browser hits this endpoint via @vercel/blob/client `upload()`, which
 * exchanges a short-lived token, then PUTs the file directly to Blob storage
 * (the file does not pass through this function — only the auth handshake).
 *
 * Required env var (set in Vercel → Project → Settings → Environment Variables):
 *   BLOB_READ_WRITE_TOKEN   — auto-injected when you connect the Blob store
 */
const { handleUpload } = require('@vercel/blob/client');

const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/heic',
  'image/heif',
];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => ({
        allowedContentTypes: ALLOWED_TYPES,
        addRandomSuffix: true,
        maximumSizeInBytes: 5 * 1024 * 1024,
        tokenPayload: JSON.stringify({ pathname }),
      }),
      onUploadCompleted: async () => {
        // No-op. The form will read the returned URL and attach it to the
        // Sheets submission itself, so we don't need to record anything here.
      },
    });

    return res.status(200).json(json);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Upload failed' });
  }
};
