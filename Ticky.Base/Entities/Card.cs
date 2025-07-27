namespace Ticky.Base.Entities;

public class Card : AbstractDbEntity, IOrderable
{
    public required string Name { get; set; }
    public required int Index { get; set; }
    public required int ColumnId { get; set; }
    public virtual Column Column { get; set; } = null!;
}
