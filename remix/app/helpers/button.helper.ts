export function setButtonColor(color?: string) {
  switch (color) {
    case 'primary':
      color = 'bg-blue-500 hover:bg-blue-700';
      break;
    case 'secondary':
      color = 'bg-gray-500 hover:bg-gray-700';
      break;
    case 'success':
      color = 'bg-green-500 hover:bg-green-700';
      break;
    case 'danger':
      color = 'bg-red-500 hover:bg-red-700';
      break;
    case 'warning':
      color = 'bg-yellow-500 hover:bg-yellow-700';
      break;
    case 'info':
      color = 'bg-indigo-500 hover:bg-indigo-700 text-white';
      break;
    case 'light':
      color = 'bg-gray-100 hover:bg-gray-300';
      break;
    case 'dark':
      color = 'bg-gray-900 hover:bg-gray-700 text-white';
      break;
    default:
      color = 'bg-gray-500 hover:bg-gray-700';
      break;
  }

  return color;
}
