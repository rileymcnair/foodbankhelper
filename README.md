# Food Bank Helper Web App

## Overview

I wanted to create an interactive web app that empowers donors to connect directly with organizations,
and vica versa. It is easy for users to visualize on an interactive map where nearby organizations and 
donations are marked. The web app is mostly front-end oriented and requires no page loading, but will 
restart all instances on refresh. Envisioned users are either: 
  - donors, who wish to schedule a donation or to view nearby organizations
  - organizations, who wish to add their organization to the system or to view nearby donations ready for pickup. 

## Features

* User Interface and Design
  * simple for user to interact with and instantly see needed information
  * similar experience for both donors and organizations
  * map and table are central design focuses
  * user chooses role of organziation/donor
* Google Maps API
  * embedded map with custom API calls
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
  and places marker on map

