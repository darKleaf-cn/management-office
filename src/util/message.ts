import { ElMessage } from 'element-plus';

export default function (type: string, message: string) {
  switch (type) {
    case 'error':
      ElMessage.error({
        message: message
      });
      break;
    case 'success':
      ElMessage.success({
        message: message
      });
      break;
    case 'warning':
      ElMessage.warning({
        message: message
      });
      break;
    case 'info':
      ElMessage.info({
        message: message
      });
      break;
    default:
      break;
  }
}
