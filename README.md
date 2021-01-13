# An Example to Typegraphql

Same basic topic about Typegraphql and it used with typegoose.

Before you clone project you should already have mongodb on your computer.
Change DB_URI variable at .env file according to your database string.

# Circular Dependency Example
Movie can call director model and also director model can call its movies. This is exampel of Circular Dependency.
