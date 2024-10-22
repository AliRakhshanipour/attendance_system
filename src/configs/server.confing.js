import { config } from 'dotenv';
config(); // Load environment variables from .env file

export const Server = app => {
  class AppServer {
    #port;

    constructor() {
      this.#port = process.env.PORT || 3000; // Default to 3000 if PORT is not set
      this.#run(app);
    }

    #run(app) {
      app.listen(this.#port, err => {
        if (err) {
          console.error('Error starting the server:', err);
          return;
        }
        console.log(`Server is running on http://localhost:${this.#port}`);
      });
    }
  }

  return new AppServer(); // Create and return an instance of the AppServer class
};
