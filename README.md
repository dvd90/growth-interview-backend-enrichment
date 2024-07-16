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
  "email": "donaldduck@disney.com",
  "name": "Donald Duck",
  "gender": "Male"
}
```

- But enriching johndoe@gmail.com will return Status code 404 - Not Found. Because this address doesn’t belong to anyone or there is no data about it in the 3rd party.

#### 2. Company enrichment - Using the email domain, get information about the company.

- For example, extracting from donaldduck@disney.com and enriching disney.com will return Status Code 200 - OK

###### Body response

```json
{
  "domain": "disney.com",
  "name": "Disney",
  "size": "Big"
}
```

- But enriching gmail.com will return Status Code 404 - Not Found. Because gmail is not a company name or there is no data about it in the 3rd party.
