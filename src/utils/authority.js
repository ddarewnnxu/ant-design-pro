// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  const authority = localStorage.getItem('antd-pro-authority');
  return authority ? JSON.parse(authority) : ['admin', 'user'];
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', JSON.stringify(authority));
}
