# Top Films

CSC 131 Software Engineering Project

California State University, Sacramento

## Contributors
Noah Fields

Michael Gomez

Taras Yakovchuk-Besarab

Justin Vierstra

Hung Phan

Lan Nguyen

## API Usage
Description and instructions for implemented endpoints

- **/api/awards/list/id**

    id can be any integer greater than 1
    the api call returns a JSON object of award from the dataset included in the project
    in case of invalid input of id, the call returns message "The award is not found!"

- **/api/award_categories**

    the api call returns an array of strings
    each of the items in the array is a unique category award that was retrieved from dataset included in the project

- **/api/movies/categories/bestpicture/year**

    year parameter can be any valid entry of year
    in case of valid entry, the api call wil return an array of strings
    each item in the array is the movie that is a nominee for the Best Picture category for entered year
    in case of invalid input of year or if the year is not found, the api call returns empty array

- **/api/movies/categories/bestpicture/:year/winner**

    this api call is similar to a previous one
    the return is an array with one element of type string
    for the valid input of year, the call will return a winner of the Best Picture category for a certain year
    in case of invalid input, the return is an empty array

- **/api/awards?year=someYear&category=&someCategory**

    - this api call, in case of valid input, will return an array of JSON objects that meet search criteria
    
    - in case search parameters such as year and category are not entered, the call will return message: "No parameters found!"
    
    - in case of invalid entry of year, category, or both or if the the entries don't exist in the dataset, the call will return a message: "No data found!"
    
    - we can search awards by the year entered, and the call will return all the awards as an array of JSON objects for the year entered
        
        example: **/api/awards?year=1930**
    
    - we can search awards by the category entered, and the call will return all the awards as an array of JSON objects for the category entered
        the category must be a string(not case sensitive), and in case of category consisting of multiple words, we can use "%20" instead of space
        
        example: **/api/awards?category=best%20picture**
    
    - we can search awards by both year and category, and the call will return the results that match search criteria
        
        example: **/api/awards?year=1960&category=sound**
        
- **/api/awards/year**

    this api call can return nominees for entered category of awards in a range of years
    the return type is an array of strings, which are entities of JSON object that match search criteria
    in case of invalid input or if there is no match, the api will return a message: "Invalid range or category!"
    
    the format for searching range of years:
        **/api/awards/year?from=1965&to=1970**
    
    the format for returning results that pertain to a specific category:
        **/api/awards/year?from=1990&to=2000&category=best%20picture**
