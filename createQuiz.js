
category = decodeURIComponent(location.href.split("?")[1]);
document.write('<span style="font-size: 40px;">' + category + '에 대한</span> ');
console.log(category);

function redirectToOX() {
    window.location.href = 'quiz_OX.html?' + category;
}
function redirectToTEXT() {
    window.location.href = 'quiz_text.html?' + category;
}