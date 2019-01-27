// Задача №1
// Класс "часы" 
// Есть реализация часиков, оформленная в виде одной функции-конструктора. 
// У неё есть приватные свойства timer, template и метод render. 
// Задача: переписать часы на прототипах. Приватные свойства и методы сделать защищёнными. 

// function Clock(obj){
//     this._template = obj.template; 
// }

// Clock.prototype._render = function(){
//     var time = new Date();
//     var h = time.getHours();
//     if(h < 10) h = "0" + h;

//     var m = time.getMinutes();
//     if(m < 10) m = "0" + m;

//     var s = time.getSeconds();
//     if(s < 10) s = "0" + s;
    
//     var output = this._template.replace("h" , h).replace("m" , m).replace("s", s);

//     console.log(output);
// }

// Clock.prototype.start = function(){
//     this._render();
//     var that = this;
//     this._timer = setInterval(function(){
//         that._render()
//     }, 1500)
// }

// Clock.prototype.stop = function(){
//     clearInterval(this._timer);
// }

// var clock = new Clock({ 
// template: 'h:m:s' 
// }); 

// clock.start();

// Задача №2
// Класс "расширенные часы" 
// Есть реализация часиков на прототипах. 
// Создайте класс, расширяющий её, добавляющий поддержку параметра precision, 
// который будет задавать частоту тика в setInterval. 
// Значение по умолчанию: 1000. 

// Для этого класс Clock надо унаследовать. 
// Исходный класс Clock менять нельзя. 
// Пусть конструктор потомка вызывает конструктор родителя. 
// Это позволит избежать проблем при расширении Clock новыми опциями.

function Clock(obj){
    this._template = obj.template; 
}

Clock.prototype._render = function(){
    var time = new Date();
    var h = time.getHours();
    if(h < 10) h = "0" + h;

    var m = time.getMinutes();
    if(m < 10) m = "0" + m;

    var s = time.getSeconds();
    if(s < 10) s = "0" + s;
    
    var output = this._template.replace("h" , h).replace("m" , m).replace("s", s);

    console.log(output);
}

Clock.prototype.start = function(){
    this._render();
    var that = this;
    this._timer = setInterval(function(){
        that._render()
    }, 1500)
}

Clock.prototype.stop = function(){
    clearInterval(this._timer);
}

var clock = new Clock({ 
template: 'h:m:s' 
}); 

function ChildClock(obj){
    Clock.apply(this, arguments);
    this._precision = obj.precision || 1000;
}

ChildClock.prototype = Object.create(Clock.prototype);
ChildClock.prototype.constructor = ChildClock;

ChildClock.prototype.start = function(){
    this._render();
    var that = this;
    this._timer = setInterval(function(){
        that._render()
    }, this._precision)
}

var childClock = new ChildClock({ 
    template: 'h:m:s',
    precision: 3000
    });

childClock.start();
