package com.taskmanager.test;

/**
 * Created by Administrator on 2018/9/29.
 */
public class FindNumber {
    public static void main(String[] a){
        for(int x=2;x<=10000;x++){
            boolean isZhishu=true;
            for(int temp=2;temp<x/2+1;temp++){
                if(x%temp==0)
                    isZhishu=false;
            }
            if(isZhishu)
            System.out.println(x+" 是质数");
        }
    }
}
