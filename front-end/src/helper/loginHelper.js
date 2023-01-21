export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (key) => {
  try {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(key))
      .split('=')[1];
  } catch (e) {
    return false;
  }
}

export const deleteCookie = (cname, cvalue) => {
  const d = new Date();
  d.setTime(d.getTime() + (-1*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
