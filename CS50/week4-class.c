#include <cs50.h>
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

int main(void)
{
  // Pointer
  int n = 50;
  int *p = &n;
  printf("n: %i is in the address %p\n", n, p); // n: 50 is in the address 0x16efb36cc
  printf("n: %i\n", *p);                        // n: 50
  printf("size: %lu\n", sizeof(p));             // n: 8
  // String
  char *s = "Hi!";      // equal string s = "Hi!";
  printf("s: %s\n", s); // s: Hi!

  string h = "Hello!";
  char *q = &h[0];
  printf("h address: %p\n", h); // h address: 0x100b17f91
  printf("q address: %p\n", q); // q address: 0x100b17f91

  string j = "Hello!";
  printf("j address: %p\n", j); // j address: 0x10020ff7d
  printf("j: %p\n", &j);        // j: 0x16fbf36a0 ?

  // Pointer Arithmtic
  char *k = "Hi!";
  printf("%c\n", *k);       // H
  printf("%c\n", *(k + 1)); // i
  printf("%c\n", *(k + 2)); // !

  int numbers[] = {2, 4, 6, 8};
  printf("%i\n", *numbers);       // 2
  printf("%i\n", *(numbers + 1)); // 4
  printf("%i\n", *(numbers + 2)); // 6
  printf("%i\n", *(numbers + 3)); // 8

  // Compare
  string t = "abc";
  string u = "abc";
  printf("%s: %p\n", t, t); // abc: 0x1047dbf51
  printf("%s: %p\n", u, u); // abc: 0x1047dbf51
  printf("%i\n", t == u);   // 1
  // t[0] = toupper(t[0]); // Bus error: 10
  // printf("%s: %p\n", t, t);
  // printf("%s: %p\n", u, u);
  // printf("%i\n", t == u);

  char *w = "abce";
  char *x = "abce";
  printf("%c: %p\n", *w, w); // a: 0x1044bbf90
  printf("%c: %p\n", *x, x); // a: 0x1044bbf90
  printf("%i\n", w == x);    // 1

  // Copy
  char *v = get_string("v: "); // input:  hi!
  char *y = malloc(strlen(v) + 1); // for /0
  strcpy(y, v);
  v[0] = toupper(v[0]); 
  printf("%c: %p\n", *v, v); // H: 0x6000005c0000
  printf("%c: %p\n", *y, y); // h: 0x6000005c0020
  printf("%i\n", v == y);    // 0
  free(y);

  // Memory
}
