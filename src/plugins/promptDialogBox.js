 //提示框——封装函数
 var msgS = function(data, time, url) {
  let msg_c = document.createElement('div');
  msg_c.id = "msg_c"
  let alertForm = document.createElement('div');
  alertForm.id = "successMsg";
  let hintImg = document.createElement('img');
  hintImg.id = 'hintImg'
  hintImg.setAttribute('src', url)
  alertForm.innerHTML = data;
  alertForm.appendChild(hintImg);
  msg_c.appendChild(alertForm);
  document.getElementsByTagName("body")[0].appendChild(msg_c);
  if (time) {
      setTimeout(function () {
          msg_c.style.display = "none";
      }, time)
  } else {
      setTimeout(function () {
          msg_c.style.display = "none";
      }, 2000)
  }
};

export default msgS

//使用
