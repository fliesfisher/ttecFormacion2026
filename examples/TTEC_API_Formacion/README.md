## 🚀 Dockerized DotNet API with SQL Server

A simple .NET Web API connected to a SQL Server instance using Entity Framework Core, all running inside Docker containers.

---

## 🐳 How to Run (Using Docker Compose)

1. **Start the containers:**

   ```bash
   docker-compose up -d
   ```

2. **Stop and remove containers:**

   ```bash
   docker-compose down
   ```

3. **Rebuild the image (if changes are made):**

   ```bash
   docker-compose up --build -d
   ```

4. **Access the API:**
   - Main endpoint: [http://localhost:2502](http://localhost:2502)
   - Get all products: [http://localhost:2502/api/products](http://localhost:2502/api/products)

---

## 🧪 Seeded Sample Data

When the API starts, it checks if the database has data. If empty, it inserts:

```json
[
  { "name": "Laptop", "price": 50000 },
  { "name": "Mouse", "price": 800 }
]
```

---

## 💠 Project Structure

```
TTEC_API_Formacion/
├── Controllers/
│   └── ProductsController.cs
├── Data/
│   └── AppDbContext.cs
├── Models/
│    └── Product.cs
├── Properties/
│    └── launchSettings.json
├── Test/
│   └── Dcokerized-Api.http
├── docker-compose.yml
├── Dockerfile
├── Program.cs
├── README.md
└── TTEC_API_Formacion.csproj
```

---

## 💾 Database

- Uses SQL Server 2022 in Docker.
- Persists data via named Docker volume `sqlserver_data`.

You can connect to the SQL Server via SSMS using:

```
Server: localhost,1433
User: sa
Password: YourStrong!Passw0rd
```

---

## 📌 Notes

- API is exposed on `http://localhost:2502`.
- Database is seeded at runtime if no data exists.
- Make sure Docker is installed and running.
- Based on ASP.NET Core 9 and EF Core 9.

---

## References Git Repositories

```bash
git clone https://github.com/amiromumi/Dockerized-DotNetAPI-SqlServer.git
```
