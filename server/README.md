# CoronaInfoChat Server

## Developing the server

### Pre-requisites

You should have the following things installed on your system:

- Python3.6 or older — This guide assumes that the python command runs the python3 binary.

  You may verify that by running:

  ```
  $python --version
  Python 3.7.2
  ```

- Postgresql — Make sure that you have the following packages installed.
  This assumes Ubuntu/Debian, find the equivalents for your system.

  ```
  sudo apt-get install postgresql # PostgreSQL server
  sudo apt-get install postgresql-contrib libpq-dev # Development helpers for PostgreSQL
  ```

### First-time setup

When setting up your repository for the first time, or after cloning a fresh copy
of the repository. You should do the following setup steps.

#### Create a "test" database in PostgreSQL

1. Make sure that PostgreSQL is running on your system. See the
   [documentation](https://www.postgresql.org/docs/10/admin.html) for more details.
2. Create a default superuser for your username that can communicate via the
   local UNIX socket. In most cases, you can do:

```
sudo -u postgres createuser -s <your-system-username>
```

Note that you must sudo into the postgres user which is the only one that
has access to a newly created database.

3. Create the database WITHOUT sudo, this ensures that the database is created
   for your user.

```
createdb test
```

The rest of this guide assumes that there's a "test" database available in your PostgreSQL server and that you can connect to it via the local UNIX domain socket.

#### Install a Python virtual environment for the server

Check the [official documentation](https://docs.python.org/3/library/venv.html)
for more details on this.

Basically, you should need to do the following:

```
# The working directory for most of this guide is inside the server directory.
cd coronachat/server
python -m venv venv
```

This will create a venv/ directory in the working directory.

To use that virtual environment, simply do the following:

```
. venv/bin/activate 
# This will change the console to print the environment you are in:
(venv) user@host~/workspace/coronachat/server$
```

All of the steps in this guide assume that you are inside the virtual environment
until explicitly stated otherwise. If you need to do something outside the virtual
environment, simply run:

```
deactivate
```

#### Install the python dependencies

Inside the virtual environment, run:

```
pip install -r requirements.txt
```

This will install all the dependencies listed in the requirements.txt file, these are needed to run the server.

If you add a new dependency and install it via `pip install <dep>` then you can update the requirements file by doing:

```
pip freeze > requirements.txt
```

### Running the server for development

Make sure you have done the following steps:

* You have a PostgreSQL server installed and running with a database named "test".
* You have a virtual environment that has all dependencies in the requirements.txt
  file installed.

Then you should be able to simply do:

```
export FLASK_APP=coronachat/dev_app.py
export FLASK_ENV=development
flask run
```

That's it!

### Editing code

We recommend using Visual Studio Code for development, with the Python extension installed you may simply do:

```
code . # from inside the server directory
```

This will ensure that autocomplete suggestions and other python checking is enabled.
