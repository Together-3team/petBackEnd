import { v4 as uuidv4 } from 'uuid'
import * as dotenv from 'dotenv'
import { S3 } from 'aws-sdk'

dotenv.config();

export class UtilityService {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  /**
   * Presigned URL 생성
   * @param objectKey 업로드할 객체 키
   * @param contentType 업로드할 객체의 MIME 타입
   * @returns 생성된 Presigned URL
   */
  public generatePresignedUrl = async (objectKey: string, contentType?: string): Promise<string> => {
    try {
      const signenUrlPut = await this.s3.getSignedUrlPromise('putObject',{
        Bucket: 'review-image-3team',
        Key: objectKey,
        Expires: 60 * 60,
        ContentType: "image/jpeg",
        ACL: "public-read",
      });
      return signenUrlPut;
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw error;
    }
  };

  /**
   * 유니크한 파일명 생성
   * @param originalName 원본 파일명
   * @returns 유니크한 파일명
   */
  private generateUniqueFileName = (originalName: string): string => {
    const extension = originalName.split('.').pop(); // 파일 확장자 추출
    return `${uuidv4()}.${extension}`; // UUID를 이용한 유니크한 파일명 생성
  };

  /**
   * 중복을 피하고 유니크한 objectKey 생성 후 Presigned URL 생성
   * @returns 생성된 Presigned URL
   * @param items
   */
  public generatePresignedUrls = async (items: { objectKey: string, contentType?: string }[]): Promise<{
    url: string;
    uniqueFileName: string
    originalFileName: string
  }[]> => {
    const urls: { url: string, uniqueFileName: string, originalFileName: string }[] = [];
    for (const item of items) {
      const uniqueFileName = this.generateUniqueFileName(item.objectKey);
      const url = await this.generatePresignedUrl(uniqueFileName, item.contentType);
      urls.push({ url, uniqueFileName, originalFileName: item.objectKey });
    }
    return urls;
  }
}