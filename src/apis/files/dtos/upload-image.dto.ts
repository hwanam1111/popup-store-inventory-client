import { CoreOutput } from '@apis/common/dtos/output.dto';
import { ImageFileEntity } from '@apis/files/entities/file.image.entity';
import { Union } from '@utils/union-type';

const uploadImageErrorMessageOutput = {
  'unsupported-file-format': 'unsupported-file-format',
} as const;
export type UploadImageErrorMessageOutput = Union<typeof uploadImageErrorMessageOutput>;

export interface UploadImageInput extends FormData {}

export interface UploadImageOutput extends CoreOutput<UploadImageErrorMessageOutput> {
  image?: ImageFileEntity;
}
