namespace Ticky.Base.Entities;

public class Column : AbstractDbEntity
{
    public required string Name { get; set; }
    public required int Index { get; set; }
    public virtual List<Card> Cards { get; set; } = [];
}
