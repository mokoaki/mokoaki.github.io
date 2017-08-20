a = 30
b = 40

proc = Proc.new { a + b }

p proc.call
#=> 70

a = 50
b = 60

p proc.call
