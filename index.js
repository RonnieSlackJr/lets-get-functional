#!/usr/bin/env node

'use strict';

const customers = require("./data/customers.json");
const _ = require("lodown-ronnieslackjr");


/**
 * 1. Import your lodown module using the require() method, 
 *    using the string 'lodown-<my-username>', or whatever 
 *    name with which you published your npm lodown project.
 * 
 * 2. Solve all problems as outlined in the README.
 */
    // write functions that take the Array of customers and return the following
    // (console.log() the results):
    
    
    // Find the number of males.
var males = 0;
customers.filter(function(e, i, c){
    if (e["gender"] === "male") males++; 
});



    
    // Find the number of females.
var females = 0;
customers.filter(function(e, i, c){
    if (e.gender === "female") females++;
});



    
   // Find the name and age of the oldest customer.
var oldest = customers[0];
customers.map(function(e, i, c){
    if (oldest.age < e.age) oldest = e;
});

    
    // Find the name and age of the youngest customer.
var youngest = customers[0];
customers.map(function(e, i, c){
    if (youngest.age > e.age) youngest = e;
});
 
    


    // Find the average balance of all the customers.
var custBalance = _.pluck(customers, "balance");
var cleanBalance = [];
custBalance.map(function (e, i ,c){
    e = e.replace("$" , "");
    e = e.replace("," , "");
    cleanBalance.push(Number(e)); 
});
var total = cleanBalance.reduce(function(e, i, c){
    return e + i;
});
var avgBalance = "$" + (total / customers.length).toFixed(2);

    

    // Find how many customers’ names begin with an arbitrary letter. Write a 
    // function to answer this question, then log an answer.
function nameStart(array, letter) {
    var letterCount = 0
    customers.filter(function(e, i, c){
        if (array[i].name.charAt(0).toLowerCase() === letter.toLowerCase()) letterCount++;
        });
    return letterCount;
}
var startsB = nameStart(customers, "b");
var startsS = nameStart(customers, "s");    
var startsM = nameStart(customers, "m"); 


    // Find how many customers’ friends’ names begin with an arbitrary letter. 
//     // Write a function to answer this question, then log an answer.
function friendNameStart(array, person, letter){
    var letterCount = 0;
    var custFriends;
    customers.filter(function(e, i, c){
        if (customers[i].name === person) custFriends = (customers[i].friends);
        
    });
    custFriends.filter(function(e, i, c){
        if (custFriends[i].name.charAt(0).toUpperCase() === letter.toUpperCase()) letterCount++;
    });
    return letterCount;
}
var sSerena = friendNameStart(customers, "Serena Odonnell", "S");
var jAdele = friendNameStart(customers, "Adele Mullen", "j");
var rMorrison = friendNameStart(customers, "Morrison Strong", "r"); 


    // Find the names of all customers who are friends with a given customer 
    // (by name). i.e. Which customers have that customer’s name in their friends list?
function friendsWith(array, person){
    var isFriendsWith = [];
    array.filter(function(e, i, c){
        if (_.contains(_.pluck(array[i].friends, "name"), person)) isFriendsWith.push(array[i].name);
    });
    return isFriendsWith;
}    

   
    // Find the top 3 most common tags among the customers.
// var allTags = [].concat.apply([], _.pluck(customers, "tags"));
// var sorted = {};
// function countOccurences(array) {
//  _.each(array, function(element, index, array) {
//     sorted[array[index]] = (sorted[array[index]] || 0) +1;
//   });
//   return sorted;
// }
// console.log(countOccurences(allTags));
// //aliqua, aute, ea, Lorem, veniam

function topTags(customers) {
   var allTags = [];
   var tagCount = {};
   var count = 0;
   var topCounts = [];
   _.each(customers, customer => _.each(customer.tags, tags => allTags.push(tags)));
 
   
   _.reduce(allTags, function(count, tag) {
       tagCount[tag] = (count[tag] || 0) + 1;
       return tagCount;
   });
   
   _.filter(tagCount, function(e, i) {
      if(e >= count) {
          topCounts.push(i);
          count = e;
       }
   });
 //console.log(topCounts);
   var topThree = topCounts.slice(-3);
   return "The three most common tags are: " + topThree;
}


    

// Create a summary of genders, the output should be:
    
    // {
    //     male: 3,
    //     female: 4,
    //     transgender: 1
    // }
    // You should solve this using reduce().

    var allGenders = _.pluck(customers, 'gender');
    var genders = {};
  function getGenders(element, index, array){
    if (!(genders[index])) genders[index] = 1;
    else (genders[index]) = genders[index] + 1;
  return genders;
      }
var genderBreakdown = _.reduce(allGenders, getGenders, 0)
 
    
    
    
    
    
    // Remember, in the node.js environment, you can both console.log() or use 
    // the dubugger to step through your code and inspect your work. Using the 
    // dubugger and stepping through your code will help you better understand 
    // the relationships and lifecycle of the Functions in your lodown library.

console.log(`There are ${males} males in the collection`);
console.log(`There are ${females} females in the collection`);
console.log(`The oldest customer is ${oldest.name}. They are ${oldest.age} years young`);
console.log(`The youngest customer is ${youngest.name}. They are ${youngest.age} years old`);
console.log(`The average blaance of all customers is ${avgBalance}`);
console.log(`${startsB} customer's name begins with the letter B`);
console.log(`${startsS} customer's names begin with the letter S`);
console.log(`${startsM} customer's names begin with the letter M`);
console.log(`Serena has ${sSerena} friends whose names start with the letter S`);
console.log(`Adele has ${jAdele} friends whose names start with the letter J`);
console.log(`Morrison has ${rMorrison} friend whose name starts with the letter R`);
console.log(`${friendsWith(customers, "Olga Newton").length} people are friends with Olga. They are ${friendsWith(customers, "Olga Newton")[0]} and ${friendsWith(customers, "Olga Newton")[1]}`);    
console.log(`${friendsWith(customers, "Serena Odonnell").length} people are friends with Serena.`);  
console.log(`${friendsWith(customers, "Buckner Kennedy").length} person friends with Buckner. It is ${friendsWith(customers, "Buckner Kennedy")[0]}`);
console.log(topTags(customers));
console.log(`The breakdown of customer genders is as follows: There are ${genderBreakdown.male} males, ${genderBreakdown.female} females, and ${genderBreakdown.transgender} transgender people`);

