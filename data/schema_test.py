from sqlalchemy import create_engine

from schema import Base

def main():
  engine = create_engine('sqlite:///:memory:', echo=True)
  Base.metadata.create_all(engine)

if __name__ == "__main__":
  main()