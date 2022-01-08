import StorageStack from './storage.stack';
import sst from '@serverless-stack/resources';

export default function main(app: sst.App): void {
  new StorageStack(app, 'storage');
}
