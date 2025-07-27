namespace Ticky.Internal.Data;

public class DataSeeder
{
    public static async Task Seed(IServiceProvider serviceProvider)
    {
        var dataContext = serviceProvider.GetRequiredService<DataContext>();

        for (int i = 0; i < 3; i++)
        {
            var column = new Column { Name = $"Column {i + 1}", Index = i };

            for (int j = 0; j < 100; j++)
            {
                var card = new Card
                {
                    Name = $"Card {i}{j + 1}",
                    Index = j,
                    ColumnId = column.Id
                };

                column.Cards.Add(card);
            }

            dataContext.Columns.Add(column);
        }

        await dataContext.SaveChangesAsync();
    }
}
