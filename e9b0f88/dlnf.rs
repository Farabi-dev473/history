// This is a comment, and is ignored by the compiler
// You can test this code by clicking the "Run" button over there ->
// or if you prefer to use your keyboard, you can use the "Ctrl + Enter" shortcut

// This code is editable, feel free to hack it!
// You can always return to the original code by clicking the "Reset" button ->

// This is the main function
fn main(){
   let mut x = String::from("Al Farabi");
   let name = &x[0..x.len()];
   print(name);
}

fn print(name: &String) {
   // *name = String::from("Al-Farabi");
   println!("{name}")
}

