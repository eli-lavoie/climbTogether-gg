# NSS Front End Capstone: ClimbTogether

### Description:
> ClimbTogether is a website designed to help you find a duo partner in League of Legends. It features Looking For Game (LFG) post creation, in which users are able to specify the details of their LFG Post such as 
> > - Minimum and Maximum Rank
> > - Date and Time
> > - Specified role their teammate will play
> > - Optional Discord link to allow for players to communicate through voice comms.


### Technologies Used:
> - HTML, CSS, JavaScript, [React](https://reactjs.org/)
> - [reactstrap](http://reactstrap.github.io)
> - [Riot Games API](https://developer.riotgames.com/)


### Usage:
> To run ClimbTogether, you must complete the following steps.
>  1. Clone the ClimbTogether respository down.
>  2. Inside the main directory, create a folder titled `api`, and inside `api` create a file called `database.json`.
>  3. Copy and paste [this code](https://pastebin.com/dzhwy7Mq) into `database.json`.
>  4. Navigate to `/src/modules/` and create a file called `riotapikey.js`.
>  5. Copy and paste [this code](https://pastebin.com/W245kQX4) into `riotapikey.js`.
>  6. Navigate to the [Riot Games Developer Portal](https://developer.riotgames.com/), create a Riot Games Account, and apply for a temporary development API key.
>  7. Once you have your API key, replace the `API_KEY_HERE` portion of `riotapikey.js`.
>  8. Navigate back to the source directory.
>  9. In one terminal window, run the function `npm start` to locally host the website.
>  10. In a separate terminal window, navigate from the main directory to `/api` and run the following command: `json-server -p 5002 -w database.json`.
>  11. Inside your web browser of choice, navigate to `localhost:3000`.
>  12. You are now able to fully use ClimbTogether!
