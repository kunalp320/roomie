class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :nw_lat
      t.float :nw_long
      t.float :se_lat
      t.float :se_long

      t.timestamps
    end
  end
end
