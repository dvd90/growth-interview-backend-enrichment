# Enrichment live coding

Create a Restful API using Nodejs and express providing the capabilities to enrich data and categorize the results.
Support also additional capabilities of Get and Delete of the results.
These categories will later be used by the sales department to close deals for the company.

### Enrichment APIs

The Enriching APIs are ready to be used and integrated to. There are two types of enrichment, each type has an endpoint:

#### 1. User enrichment - Using the email, get information about the user.

- For example, enriching donaldduck@disney.com will return Status Code 200 - OK

###### Body response

```json
{
  "success": true,
  "data": {
    "email": "donaldduck@disney.com",
    "name": "Donald Duck",
    "gender": "Male"
  }
}
```

- But enriching johndoe@gmail.com will return Status code 404 - Not Found. Because this address doesn’t belong to anyone or there is no data about it in the 3rd party.

#### 2. Company enrichment - Using the email domain, get information about the company.

- For example, extracting from donaldduck@disney.com and enriching disney.com will return Status Code 200 - OK

###### Body response

```json
{
  "success": true,
  "data": {
    "domain": "disney.com",
    "name": "Disney",
    "size": "Grand"
  }
}
```

- But extracting from johndoe@gmail.com and enriching gmail.com will return Status Code 404 - Not Found. Because gmail is not a company name or there is no data about it in the 3rd party.

###### Enrichment API curls

```ssh
# User Enrichment
curl --location 'https://growth-interview-mock.artlist.io/v1/enrich/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "donaldduck@disney.com"
}'

# Company Enrichment
curl --location 'https://growth-interview-mock.artlist.io/v1/enrich/company' \
--header 'Content-Type: application/json' \
--data '{
    "domain" : "disney.com"
}'
```

### There are 3 API endpoints that needs to be supported and implemented:

##### 1. Enrich, categorize and store

- Verb: POST
- Input params: email
- Output: The result of the category logic (check explanation below)
- Description: This endpoint enriches the email, categories the result, stores it in the database and returns a response.

##### 2. Get a user’s saved data

- Verb: GET
- Input params: email
- Output: The result of the category logic
- Description: This endpoint returns all the data saved for the user

##### 3. Delete all data of all company’s email stored.

- Verb: DELETE
- Input params: company name
- Output: Number of how many deleted
- Description: This endpoint deletes all data stored for a company

###### Category result example

```json
{
  "email": "donaldduck@disney.com",
  "userName": "Donald Duck",
  "gender": "Male",
  "companyName": "Disney",
  "category": "Likely"
}
```

### The Category logic:

##### There are 2 categories “Likely” and “Unlikely” that need to be stored. Not all input emails will be categorized under these 2 categories. Emails which aren’t, shouldn’t be stored.

1. “Likely” is for all emails whose company enrichment is of size Grand. OR for all emails whose company enrichment is of size Big AND have both company enrichment and user enrichment.
2. “Unlikely” is for all emails whose company enrichment is of size Big. OR for all emails whose company enrichment is of size Medium AND have both company enrichment and user enrichment.

###### Possible values for Company Size are:

```ssh
Small, Medium, Big, Grand
```

#### Some guidelines:

1. To store data, use an in memory “database” that could be replaced easily in the future with an actual database.
2. To enrich use a “3rd party APIs” that support required capabilities. Provided in the task.
3. Consider which logs should be logged for debugging purposes, using console.log.
4. Consider which input validations should be enforced.
5. Consider code structure, code reuse and run time efficiency.
6. The DELETE action must be protected from being exploited by malicious intent, implement or suggest a fitting security measure for it.

Please send the results of exercise to omri.ofek@artlist.io

###### List of emails and companies to use

```ssh
mickeymouse@disney.com
donaldduck@disney.com
minimouse@disney.com
spiderman@marvel.com
ironman@marvel.com
batman@dc.com
wonderwoman@dc.com
leonardo@tmnt.com
donatello@tmnt.com


disney.com - Grand company
marvel.com - Big company
dc.com - Medium company
tmnt.com - Small company
```

###### Examples for POST API:

1. email - johndoe@disney.com should return be categorized as Likely because they're from a Grand company, even though there is no enrichment information about the user

```json
{
  "email": "johndoe@disney.com",
  "userName": null,
  "gender": null,
  "companyName": "Disney",
  "category": "Likely"
}
```

2. email - batman@dc.com should return be categorized as Unlikely because they're from a Medium company, And there is information about the user

```json
{
  "email": "batman@dc.com",
  "userName": "Bruce Wayne",
  "gender": "Male",
  "companyName": "Disney",
  "category": "Unlikely"
}
```

3. email - donatello@tmnt.com should not be categorized as anything because they're from a Small company

4. email - johndoe@gmail.com should not be categorized as anything because they're not from any known company
