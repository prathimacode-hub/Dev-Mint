let scrollTopBtn = document.getElementById("goto-top-btn");

const showTopBtn = () => {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

const goTop= ()=>{
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
window.onscroll = () => {
  showTopBtn();
};