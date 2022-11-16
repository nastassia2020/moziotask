// https://moziotask.herokuapp.com/ | https://git.heroku.com/moziotask.git
export default function SearchPage(){
    const accessData = async({ fetch }) => {
        const resDB = await fetch("https://moziotask.herokuapp.com/cities");
        const DB = await resDB.json();
        return {
         props: {
          DB
         }
        }
    }

    return (
        <div>
            <h1>Search Page</h1>
            <div>{accessData}</div>
        </div>
    )
}