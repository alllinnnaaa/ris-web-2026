using backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ITicketService, TicketService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () => Results.Ok("ok"));

app.MapGet("/info", (IWebHostEnvironment env, ITicketService service) => Results.Ok(new
{
    app = "Energy anomalies API",
    environment = env.EnvironmentName,
    version = "ЛР7, учебный каркас",
    service = service.Name
}));

app.MapControllers();

app.Run();