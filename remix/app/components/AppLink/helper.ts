export function setButtonType(type?: string) {
  switch (type) {
    case 'primary':
      type = 'bg-blue-500 hover:bg-blue-700';
      break;
    case 'secondary':
      type = 'bg-gray-500 hover:bg-gray-700';
      break;
    case 'success':
      type = 'bg-green-500 hover:bg-green-700';
      break;
    case 'danger':
      type = 'bg-red-500 hover:bg-red-700';
      break;
    case 'warning':
      type = 'bg-yellow-500 hover:bg-yellow-700';
      break;
    case 'info':
      type = 'bg-indigo-500 hover:bg-indigo-700 text-white';
      break;
    case 'light':
      type = 'bg-gray-100 hover:bg-gray-300';
      break;
    case 'dark':
      type = 'bg-gray-900 hover:bg-gray-700 text-white';
      break;
    default:
      type = 'bg-gray-500 hover:bg-gray-700';
      break;
  }

  return type;
}
