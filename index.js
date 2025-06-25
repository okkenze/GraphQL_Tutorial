import {ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


//import   getConnection  from './_sqlDBCon.js';

//db
import db  from './_db.js';



//types
import { typeDefs} from './schema.js';

const sqlQuery = "SELECT id," +
                  "title," +
                  "(SELECT STRING_AGG(value, ',') " +
                  "FROM STRING_SPLIT(platform, ',')) AS platform FROM Games";

const resolvers = {
  Query: {
    games() {
    // try {
    //       const pool = await getConnection.getConnection();
    //       const result = await pool.request().query(sqlQuery);
    //        // Convert comma-separated string back to array
    //      return result.recordset.map(game => ({
    //         ...game,
    //         platform: game.platform ? game.platform.split(',') : []
    //       }));
          
    //    } catch (err) {
    //       throw new Error('Failed to fetch games >'+ err.message);
    //     }
      return db.games
    },
     game(_, args ) {
      return db.games.find((game) => game.id === args.id)
    },
    authors(){
      return db.authors
    },
     author(_, args ) {
      return db.authors.find((author) => author.id === args.id)
    },
    reviews() {
      return db.reviews
    },
    review(_, args ) {
      return db.reviews.find((review) => review.id === args.id)
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id)
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id)
    }
  },
  Review: {
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id)
    },
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id)
    }
  },
  Mutation:{
   
    deleteGame(_, args) {
     db.games = db.games.filter((game) => game.id !== args.id)
      return db.games
    },
     addGame(_,args){
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString()
      }
      db.games.push(game);
        return game;
    },
        updateGame(_, args) {
          // let game = db.games.find((game) => game.id === args.id);
          // if (!game) {
          //   throw new Error('Game not found');
          // }
          // if (args.game.title) {
          //   game.title = args.game.title;
          // }
          // if (args.game.platform) {
          //   game.platform = args.game.platform;
          // }
          // return game;
          db.games = db.games.map((game) => {
            if (game.id === args.id) {
              return {
                ...game,
                ...args.game
              }
            }
            return game
          })
          return db.games.find((game) => game.id === args.id)
      }
  }
}

//server setup
const server = new ApolloServer ({
  typeDefs,
  resolvers
  
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀 Server ready at: ${url}`)   ;