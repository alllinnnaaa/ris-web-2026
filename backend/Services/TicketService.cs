namespace backend.Services;

public interface ITicketService
{
    string Name { get; }
}

public class TicketService : ITicketService
{
    public string Name => "TicketService (заготовка ЛР7)";
}