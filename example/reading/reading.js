var task1 = $('#task1').data('hello');
$('.result.result1').append(task1.toString());

var task2 = $('#task2').data();
console.log(task2);
$('.result.result2').append(task2.one + ' ' + task2.two);

var task3 = $('.task3').data('hello');
for(var i = 0; i < task3.length; i++){
    $('.result.result3').append('Hello ' + task3[i] + '<br>');
}