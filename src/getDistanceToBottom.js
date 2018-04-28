export default {
  distanceToBottom:function () {
    let offsetHeight = document.documentElement.offsetHeight;
    let scrollTop = document.documentElement.scrollTop;
    let height = window.screen.height;
    let distanceToBottom = offsetHeight - height - scrollTop;
    return distanceToBottom;
  }
}
