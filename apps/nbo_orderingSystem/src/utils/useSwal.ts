import Swal, { type SweetAlertOptions } from 'sweetalert2'


export function alertSucc(options: SweetAlertOptions) {
  return Swal.fire({
    position: 'center',
    icon: 'success',
    ...options,
  })
}
export function alertWarn(options: SweetAlertOptions) {
  return Swal.fire({
    position: 'center',
    icon: 'warning',
    ...options,
  })
}
export function alertErr(options: SweetAlertOptions) {
  return Swal.fire({
    position: 'center',
    icon: 'error',
    ...options,
  })
}

export function alertText(options: SweetAlertOptions) {
  return Swal.fire({
    position: 'center',
    ...options,
  })
}