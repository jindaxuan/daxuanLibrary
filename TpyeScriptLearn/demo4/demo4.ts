// 接口
interface Person {
name:string;
age?:number; // 代表可有可无
}
const getPersonName = (person:Person):void =>{
    console.log(person.name);
}
const setPersonName = (person:Person,name:string): void =>{
    person.name = name
}

const person = {
    name:'dell',
    sex:'male'
}
getPersonName(person)

setPersonName(person,'lee')