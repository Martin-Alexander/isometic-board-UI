// Makes a POST request to the serve with given data and to give url/action
function sendToServer(params) {
  $.ajax({
    method: "POST",
    url: "/" + params.action,
    data: params.data
  });
}