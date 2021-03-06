# Food Bank Helper Web App

Try it out! https://donatehelper.netlify.app/ (please enable location if possible)

## Overview

Fully interactive web application that empowers donors to connect directly with organizations,
and vica versa. The web app is mostly front-end oriented and requires no page loading, but will 
restart all instances on refresh. Envisioned users are either: 
  - Donors, who wish to schedule a donation or to view nearby organizations
  - Organizations, who wish to add their organization to the system or to view nearby donations ready for pickup. 

## Features

* User Interface and Design
  * simple for user to interact with and instantly see needed information
  * similar experience for both donors and organizations
  * map and table are central design focuses
  * user chooses role of organization/donor
* Google Maps API
  * embedded map with custom API calls to fetch coordinates of locations and place markers
  * autocomplete location entering
  * custom markers at user-enterable location 
* Key Information Table
  * donors: displays nearby organizations
  * organizations: displays nearby donations
  * click on specfic entry signals map to pan to corresponding marker
* Submission Form
  * donors: input list of donation items
  * organizations: input organization name
  * both: input location
  * submit button creates new table entry for opposite party to view
  and places marker through google api coordinates

