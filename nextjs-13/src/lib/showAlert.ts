import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default async function makeSweetAlert(
  title: string,
  description: string,
  type?: SweetAlertIcon
) {
  return MySwal.fire(title, description, type);
}
